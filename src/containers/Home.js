import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";

export default function Home() {
  const [carts, setCarts] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const carts = await loadCarts();
        setCarts(carts);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadCarts() {
    return API.get("carts", "/carts");
  }

  function renderCartsList(carts) {
    return (
      <>
        <LinkContainer to="/carts/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new cart</span>
          </ListGroup.Item>
        </LinkContainer>
        {carts.map(({ cartId, content, createdAt }) => (
          <LinkContainer key={cartId} to={`/carts/${cartId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {content.trim().split("\n")[0]}
              </span>
              <br />
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Data Shop Data Buy</h1>
        <p className="text-muted">Your very own shopping buddy</p>
      </div>
    );
  }

  function renderCarts() {
    return (
      <div className="carts">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Carts</h2>
        <ListGroup>{!isLoading && renderCartsList(carts)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderCarts() : renderLander()}
    </div>
  );
}
