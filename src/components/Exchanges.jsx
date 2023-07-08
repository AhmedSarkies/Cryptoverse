import React, { Fragment, useState } from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar, Select } from "antd";
import HTMLReactParser from "html-react-parser";

import {
  useGetCryptoDetailsQuery,
  useGetCryptosQuery,
  useGetExchangesQuery,
} from "../services/cryptoApi";
import Loader from "./Loader";

const { Text } = Typography;
const { Option } = Select;

const Exchanges = () => {
  const [exchangeId, setExchangeId] = useState("Qwsogvtv82FCd");
  const { data, isFetching } = useGetExchangesQuery(exchangeId);
  const { data: dataCoin } = useGetCryptoDetailsQuery(exchangeId);
  const { data: coin } = useGetCryptosQuery(100);
  const exchangesList = data?.data?.exchanges;
  const coins = coin?.data?.coins;
  const ExchangeDescription = dataCoin?.data?.coin?.description;

  if (isFetching) return <Loader />;

  return (
    <Fragment>
      <Col span={24} style={{ marginBottom: "20px", marginLeft: "20px" }}>
        <Select
          showSearch
          className="select-news"
          placeholder="Select a Crypto"
          optionFilterProp="children"
          onChange={(value) => setExchangeId(value)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="Qwsogvtv82FCd">Bitcoin</Option>
          {coins?.slice(1)?.map((exchange) => (
            <Option key={exchange.uuid} value={exchange.uuid}>
              {exchange.name}
            </Option>
          ))}
        </Select>
      </Col>

      <Row style={{ textAlign: "center", marginBottom: "15px" }}>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row style={{ textAlign: "center" }}>
        {exchangesList?.map((exchange) => {
          const { uuid, rank, iconUrl, name, numberOfMarkets, marketShare } =
            exchange;
          const items = [
            {
              key: uuid,
              showArrow: false,
              label: (
                <Row key={uuid}>
                  <Col span={6} style={{ textAlign: "start" }}>
                    <Text>
                      <strong>{rank}.</strong>
                    </Text>
                    <Avatar className="exchange-image" src={iconUrl} />
                    <Text>
                      <strong>{name}</strong>
                    </Text>
                  </Col>
                  <Col span={6}>
                    $
                    {millify(
                      exchangesList?.map(
                        (exchange) => Object.values(exchange)[9]
                      ),
                      { locales: "us-US", precision: 3 }
                    )}
                  </Col>
                  <Col span={6}>
                    {millify(numberOfMarkets, {
                      locales: "us-US",
                      precision: 3,
                    })}
                  </Col>
                  <Col span={6}>
                    {marketShare
                      ? millify(marketShare, {
                          locales: "us-US",
                          precision: 3,
                        })
                      : "6"}
                    %
                  </Col>
                </Row>
              ),
              children: (
                <div style={{ textAlign: "start" }}>
                  {HTMLReactParser(ExchangeDescription || "No Description")}
                </div>
              ),
            },
          ];
          return (
            <Col span={24} key={uuid}>
              <Collapse items={items} style={{ marginLeft: "20px" }} />
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
};

export default Exchanges;
