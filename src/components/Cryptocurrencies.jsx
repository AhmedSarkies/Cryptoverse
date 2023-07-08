import React, { Fragment, useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { Loader } from "./index";

import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [searchTerm, cryptosList]);

  if (isFetching) return <Loader />;

  return (
    <Fragment>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      )}
      <Row
        gutter={[32, 32]}
        className="crypto-card-container"
        style={{ justifyContent: "center" }}
      >
        {cryptos?.map((currency) => {
          const { uuid, rank, name, iconUrl, price, marketCap, change } =
            currency;
          return (
            <Col
              xs={24}
              sm={12}
              lg={10}
              xl={8}
              xxl={6}
              className="crypto-card"
              key={uuid}
            >
              <Link to={`/crypto/${uuid}`}>
                <Card
                  title={`${rank}. ${name}`}
                  extra={
                    <img className="crypto-image" src={iconUrl} alt={name} />
                  }
                  hoverable
                >
                  <p>
                    Price: {millify(price, { locales: "us-US", precision: 3 })}$
                  </p>
                  <p>Market Cap: {millify(marketCap, { locales: "us-US" })}</p>
                  <p>Daily Change: {millify(change, { locales: "us-US" })}%</p>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
};

export default Cryptocurrencies;
