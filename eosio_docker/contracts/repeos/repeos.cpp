#include "repeos.h"

#include <eosiolib/eosio.hpp>
#include <eosiolib/transaction.hpp>

using namespace eosio;


namespace decentrawise
{

void repeos::create(uint64_t id, account_name user1, account_name user2)
{
    require_auth(_self);
    require_auth(user1);
    require_auth(user2);
    
    records rectable( _self, _self );
    
    rectable.emplace( _self, [&]( auto& rec ) 
    {
        rec.id = id;
        
        rec.user1 = user1;
        rec.user1approved = false;
        rec.user1stars = 0;
        rec.user1comment = std::string("");
        
        rec.user2 = user2;
        rec.user2approved = false;
        rec.user2stars = 0;
        rec.user2comment = std::string("");
    });
}

void repeos::approve1(uint64_t id)
{
    require_auth(_self);

    records rectable( _self, _self );
    
    auto rec_it = rectable.require_find( id );
    require_auth(rec_it->user1);

    rectable.modify( rec_it, _self, [&]( auto& rec )
    {
        rec.user1approved = true;
    });
}

void repeos::approve2(uint64_t id)
{
    require_auth(_self);

    records rectable( _self, _self );
    
    auto rec_it = rectable.require_find( id );
    
    require_auth(rec_it->user2);

    rectable.modify( rec_it, _self, [&]( auto& rec )
    {
        rec.user2approved = true;
    });
}

void repeos::rate1(uint64_t id, uint8_t stars, const std::string &comment)
{
    require_auth(_self);
    

    records rectable( _self, _self );
    
    auto rec_it = rectable.require_find( id );
    require_auth(rec_it->user1);

    rectable.modify( rec_it, _self, [&]( auto& rec )
    {
        rec.user1stars = stars;
        rec.user1comment = comment;
    });
}

void repeos::rate2(uint64_t id, uint8_t stars, const std::string &comment)
{
    require_auth(_self);

    records rectable( _self, _self );

    auto rec_it = rectable.require_find( id );
    require_auth(rec_it->user2);

    rectable.modify( rec_it, _self, [&]( auto& rec )
    {
        rec.user2stars = stars;
        rec.user2comment = comment;
    });
}

} // namespace

EOSIO_ABI( decentrawise::repeos, (create)(approve1)(approve2)(rate1)(rate2) )
