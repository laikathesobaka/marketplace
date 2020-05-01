import React, { useState } from "react";
import Product from "./Product";
import styled from "styled-components";
import { compareSimilarity } from "../helpers/search";
const MATCH_THRESHOLD = 0.5;

const SearchBar = ({ show, updateShowSearch, onProductClick, products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const productNames = Object.keys(products).map(
    (productID) => products[productID].name
  );
  const handleSearchSubmit = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const matches = compareSimilarity(searchTerm.toLowerCase(), productNames);
      const highestScoringMatches = new Set(
        matches.ratings.map((match) => {
          if (match.rating >= MATCH_THRESHOLD) {
            return match.target;
          }
        })
      );
      const bestMatchingProducts = Object.keys(products).reduce(
        (res, productID) => {
          if (highestScoringMatches.has(products[productID].name)) {
            res.push(products[productID]);
          }
          return res;
        },
        []
      );
      setSearchResults(bestMatchingProducts);
      setSearchTerm("");
    }
    console.log("SEARCH RESULTS ---- ", searchResults);
  };

  const handleProductClick = (item) => {
    updateShowSearch(false);
    onProductClick(item);
  };

  return (
    <div>
      {show ? (
        <Container>
          <Close onClick={() => updateShowSearch(false)}>X</Close>
          <Form>
            <Input
              type="text"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchSubmit}
              placeholder="Search by product or farmer."
            />
          </Form>
          <SearchResults>
            {searchResults.length ? (
              searchResults.map((item) => (
                <Item onClick={() => handleProductClick(item)}>
                  {console.log("ITEM ! ", item)}
                  <ItemImg src={item.media} />
                  <div>{item.name}</div>
                </Item>
              ))
            ) : (
              <Default>Can't find what you need? Let us know!</Default>
            )}
          </SearchResults>
        </Container>
      ) : null}
    </div>
  );
};

export default SearchBar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 300px;
  background-color: white;
  border-bottom-style: solid;
  border-width: 1px;
  z-index: 4;
`;

const Close = styled.div`
  align-self: end;
  position: fixed;
  padding: 25px;
  margin-left: 10px;
`;

const Form = styled.form`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 5px;
  box-sizing: border-box;
  border-width: 0.09em;
  padding: 5px;
  border-color: darkslategray;
`;

const Input = styled.input`
  padding: 5px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  width: 200px;
`;

const SearchResults = styled.div`
  display: flex;
  flex-direction: row;
  //   align-items: baseline;
  margin-top: 20px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  font-size: 10px;
  padding: 20px;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  background-color: aliceblue;
  height: 50px;
  margin-left: 5px;
  margin-right: 5px;
`;

const ItemImg = styled.img`
  width: 50px;
`;

const Default = styled.div`
  font-size: 12px;
`;
