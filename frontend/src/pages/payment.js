import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// NEVER store private keys in any source code in your real life development
// This is for demo purposes only!
const accounts = [
  {"name":"useraaaaaaaa", "privateKey":"5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5", "publicKey":"EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b"},
  {"name":"useraaaaaaab", "privateKey":"5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg", "publicKey":"EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p"},
  {"name":"useraaaaaaac", "privateKey":"5K2jun7wohStgiCDSDYjk3eteRH1KaxUQsZTEmTGPH4GS9vVFb7", "publicKey":"EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58"},
  {"name":"useraaaaaaad", "privateKey":"5KNm1BgaopP9n5NqJDo9rbr49zJFWJTMJheLoLM5b7gjdhqAwCx", "publicKey":"EOS8LoJJUU3dhiFyJ5HmsMiAuNLGc6HMkxF4Etx6pxLRG7FU89x6X"},
  {"name":"useraaaaaaae", "privateKey":"5KE2UNPCZX5QepKcLpLXVCLdAw7dBfJFJnuCHhXUf61hPRMtUZg", "publicKey":"EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb"},
  {"name":"useraaaaaaaf", "privateKey":"5KaqYiQzKsXXXxVvrG8Q3ECZdQAj2hNcvCgGEubRvvq7CU3LySK", "publicKey":"EOS5btzHW33f9zbhkwjJTYsoyRzXUNstx1Da9X2nTzk8BQztxoP3H"},
  {"name":"useraaaaaaag", "privateKey":"5KFyaxQW8L6uXFB6wSgC44EsAbzC7ideyhhQ68tiYfdKQp69xKo", "publicKey":"EOS8Du668rSVDE3KkmhwKkmAyxdBd73B51FKE7SjkKe5YERBULMrw"}
];

// set up styling classes using material-ui "withStyles"
const styles = theme => ({
  card: {
    marginLeft: 300,
    marginRight: 300,
  },
  media: {
    height: 200
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  formButton: {
    marginTop: theme.spacing.unit,
    width: "100%",
  },
  pre: {
    background: "#ccc",
    padding: 10,
    marginBottom: 0.
  },
});

// Payment component
class Payment extends Component {

  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      data: {
        title: 'Trespass Edwards II Mens Waterproof Jacket with Hood in Green Blue & Grey',
        price: 120,
        largeImage: '/images/pay.jpg',
        shortDescription: 'The Edwards II men\'s waterproof jacket is a great option if you are looking for a casual jacket.',
        longDescription: `This hooded men's jacket is designed using waterproof, windproof and breathable fabric, allowing you to feel comfortable and cosy all day long. Four zipped pockets allow you to store all your must-have items such as your keys, wallet and gloves. Made in 4 different colours, this waterproof jacket is a great option for work, travel or spending time outdoors. This waterproof jacket is designed in 4 different colours: blue, black, olive green and carbon grey.
        Product Features: Adjustable Concealed Hood, 2 Zipped Lower Pockets, Zipped Chest Pocket, Hem Drawcord with Side Adjusters, Elasticated Cuff with Adjustable Tabs, Inner Zipped Pocket.`
      }
    };
    this.handlePay = this.handlePay.bind(this);
  }

  // generic function to handle form submit
  // call contract on blockchain by using eosjs
  async handlePay(history, to) {
    // collect form data
    let account1 = accounts[0].name;
    let account2 = accounts[1].name;
    let contract = 'repeos';
    let privateKey = '5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N';

    // eosjs function call: connect to the blockchain
    const eos = Eos({keyProvider: [privateKey, accounts[0].privateKey, accounts[1].privateKey]});
    const result = await eos.transaction({
      actions: [{
        account: "repeos",
        name: 'approve2',
        authorization: [{
          actor: contract,
          permission: 'active',
        },{
          actor: account2,
          permission: 'active',
        }],
        data: {id: this.props.tx},
      }],
    });

    console.log(result);

    const result1 = await eos.transaction({
      actions: [{
        account: "repeos",
        name: 'rate1',
        authorization: [{
          actor: contract,
          permission: 'active',
        },{
          actor: account1,
          permission: 'active',
        }],
        data: {id: this.props.tx, stars: 5, comment: 'Excellent buyer, easy comunication and fast payment. A+'},
      }],
    });

    console.log(result1);

    history.push(to)
  }

  render() {
    const { noteTable } = this.state;
    const { classes } = this.props;

    const ButtonToPay = ({ title, history, to }) => (
      <Button
        size="small" color="primary"
        onClick={() => this.handlePay(history, to)}
      >
        {title}
      </Button>
    );

    const ButtonToNavigate = ({ title, history, to }) => (
      <Button
        size="small" color="primary"
        onClick={() => history.push(to)}
      >
        {title}
      </Button>
    );

    return (
      <div>
        <Paper className={classes.paper}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={this.state.data.largeImage}
                title={this.state.data.shortDescription}
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h3" color="secondary" align="right">
                  {this.state.data.price + '€'}
                </Typography>
                <Typography variant="headline" component="h2">
                  {this.state.data.title}
                </Typography>
                <Typography component="p">
                  {this.state.data.shortDescription}
                  {this.state.data.longDescription}
                </Typography>
                <FormControlLabel
                  control={<Checkbox onChange={this.onAccept} />}
                  label="Accept RepEOS Universal Reputation System validation"
                />
              </CardContent>
            </CardActionArea>
            <CardActions>
              <ButtonToNavigate {...this.props} title="Back" to="/" />
              <ButtonToPay {...this.props} title="PAY" to="/rate" />
            </CardActions>
          </Card>
        </Paper>
      </div>
    );
  }

}

export default withStyles(styles)(Payment);
