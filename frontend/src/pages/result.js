import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ReactStars from 'react-stars';
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
    margin: 20,
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

// Result component
class Result extends Component {

  constructor(props) {
    super(props)
    this.state = {
      txs: [] // to store the table rows from smart contract
    };
  }

  async componentDidMount() {
    let contract = 'repeos';
    let privateKey = '5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N';

    // eosjs function call: connect to the blockchain
    const eos = Eos({keyProvider: privateKey});
    const tableParams = {
      //  EOS
      json: true,
      code: 'repeos',
      scope: contract,
      table: 'record',
      table_key: 'id',
      lower_bound: 0,
    };
    const result = await eos.getTableRows(tableParams);

    if(result.rows.length == 0) {
        return;
    }

    this.setState({txs: result.rows});
  }

  render() {
    const { noteTable } = this.state;
    const { classes } = this.props;

    // generate each note as a card
    const generateCard1 = (key, user, txs) => {
      var total = 0;
      var avg = 0;
      var comments = [];
      if(txs.length > 0) {
        for(var i = 0; i < txs.length; i++) {
          total += txs[i].user1stars;

          comments.push(
            <div>
              <br />
              <ReactStars
                value={txs[i].user1stars}
                count={5}
                size={20}
                color2={'#ffd700'}
                edit={false}
              />
              {txs[i].user1comment}
            </div>
          );
        }
        avg = total / txs.length;
      }

      return (
        <Grid item xs={6}>
          <Card className={classes.card} key={key}>
            <CardContent>
              <Typography variant="headline" component="h2">
                {user}
              </Typography>
              <ReactStars
                value={avg}
                count={5}
                size={20}
                color2={'#ffd700'}
                edit={false}
              />
              <hr />
              <Typography style={{fontSize:12}} color="textSecondary" gutterBottom>
                {comments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    }

    // generate each note as a card
    const generateCard2 = (key, user, txs) => {
      var total = 0;
      var avg = 0;
      var comments = [];
      if(txs.length > 0) {
        for(var i = 0; i < txs.length; i++) {
          total += txs[i].user2stars;

          comments.push(
            <div>
              <br />
              <ReactStars
                value={txs[i].user2stars}
                count={5}
                size={20}
                color2={'#ffd700'}
                edit={false}
              />
              {txs[i].user2comment}
            </div>
          );
        }
        avg = total / txs.length;
      }

      return (
        <Grid item xs={6}>
          <Card className={classes.card} key={key}>
            <CardContent>
              <Typography variant="headline" component="h2">
                {user}
              </Typography>
              <ReactStars
                value={avg}
                count={5}
                size={20}
                color2={'#ffd700'}
                edit={false}
              />
              <hr />
              <Typography style={{fontSize:12}} color="textSecondary" gutterBottom>
                {comments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    }

    const card1 = generateCard1(1, 'user1', this.state.txs);
    const card2 = generateCard2(2, 'user2', this.state.txs);

    return (
      <div>
        <Paper className={classes.paper}>
          <Typography variant="title" color="inherit">
            Result
          </Typography>
          <Grid container>
            {card1}
            {card2}
          </Grid>
        </Paper>
        <pre className={classes.pre}>
          Below is what is written to the Smart-Contract:
          <br/><br/>
          {JSON.stringify(this.state.txs, null, 2)}
        </pre>
      </div>
    );
  }

}

export default withStyles(styles)(Result);
