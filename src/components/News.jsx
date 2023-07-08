import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment/moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 27,
  });

  if (!cryptoNews?.value) return <Loader />;

  return (
    <Row gutter={[24, 24]} style={{ justifyContent: "center" }}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option key={coin.name} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews?.value.map((news, idx) => (
        <Col xs={24} sm={18} lg={10} xl={8} xxl={6} key={idx}>
          <Card hoverable className="news-card">
            <a href={news?.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={5}>
                  {news?.name?.length > 50
                    ? `${news?.name.substring(0, 50)} ...`
                    : news?.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt={news?.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <p>
                {news?.description?.length > 100 &&
                  `${news?.description.substring(0, 100)} ...`}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news?.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt={news?.name}
                  />
                  <Text className="provider-name">
                    {!news?.provider[0]?.name.length > 15
                      ? news?.provider[0].name
                      : news?.provider[0].name.substring(0, 15)}
                  </Text>
                </div>
                <Text>
                  {moment(news?.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
