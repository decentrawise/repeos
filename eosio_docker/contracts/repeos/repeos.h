#pragma once
#include <eosiolib/eosio.hpp>

namespace decentrawise {
    
class repeos : public eosio::contract 
{
    struct record {
        uint64_t id;

        account_name user1;
        bool user1approved;
        uint8_t user1stars;
        std::string user1comment;

        account_name user2;
        bool user2approved;
        uint8_t user2stars;
        std::string user2comment;
        
        account_name primary_key() const { return id; }
        
        EOSLIB_SERIALIZE( record, (id)(user1)(user1approved)(user1stars)(user1comment)(user2)(user2approved)(user2stars)(user2comment) )
    };

    typedef eosio::multi_index<N(record), record> records;
        
public:
    using eosio::contract::contract;

    void create(uint64_t id, account_name user1, account_name user2);
    void approve1(uint64_t id);
    void approve2(uint64_t id);
    void rate1(uint64_t id, uint8_t stars, const std::string &comment);
    void rate2(uint64_t id, uint8_t stars, const std::string &comment);
    
};


}
