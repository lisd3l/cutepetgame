import React, { useState, useMemo, useCallback, useEffect } from "react";
import { List, Card, Button, Row, Col, Select, InputNumber, Pagination } from "antd";
import Address from "./Address"
import AddressInput from "./AddressInput"

const QuizItems = [
  {
    key: 1,
    name: 'Cat',
    amount: 300
  },
  {
    key: 2,
    name: 'Dog',
    amount: 400
  },
  {
    key: 3,
    name: 'Mouse',
    amount: 300
  }
]

const numPad = (str: string) => `0${str}`.slice(-2)

interface WallViewProps {
}

export default function WalletView(props: any) {

  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      const diff = endOfDay - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${numPad(hours)} : ${numPad(minutes)} : ${numPad(seconds)}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const clearPetSelect = useCallback(async () => {
    setSelectedPetCount(1000);
  }, [])

  const changePetSelect = useCallback(async (value) => {
    setSelectedPetValue(value);
    if (value == "") {
      // TODO 从合约取
      setSelectedPetCount(1000);
    } else if (value == "1") {
       // TODO 从合约取
       setSelectedPetCount(300);
    } else if (value == "2") {
      // TODO 从合约取
      setSelectedPetCount(400);
    } else if (value == "3") {
      // TODO 从合约取
      setSelectedPetCount(300);
    }
  }, []);

  const { dataSource, mainnetProvider, blockExplorer, transfer, mint, minting } = props;
  const [transferToAddresses, setTransferToAddresses] = useState({});
  const quizOptions = useMemo(() => {
    return QuizItems.map(item => ({ label: item.name, value: item.key }))
  }, [])

  const [selectedPetCount, setSelectedPetCount] = useState(0);
  const [selectedPetValue, setSelectedPetValue] = useState("");

  const convertQuiz = useMemo(() => {
    if (!selectedPetValue) return QuizItems
    return QuizItems.filter(item => item.key !== selectedPetValue)
  }, [selectedPetValue])

  const [page, setPage] = useState(1)
  const pageSize = 5
  const pagedItems = useMemo(() => {
    return dataSource.slice(pageSize * (page - 1), pageSize * page)
  }, [page, dataSource])

  return (
    <div style={{ width: 640, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
      <div style={{ fontSize: 20, padding: 8, fontWeight: "bold", letterSpacing: '.01em' }}>
        <div><code style={{ marginRight: 8 }}>{timeLeft}</code>left until today</div>
      </div>
      <Row align="middle" style={{ marginTop: 20 }}>
        {
          QuizItems.map(item => <Col key={item.key} span={8}>
            <span style={{ fontSize: 20, marginRight: 8, fontWeight: "bold" }}>{item.name} Amount</span>&nbsp;
            <code style={{ fontSize: 16, fontWeight: "600" }}>{item.amount}</code>
          </Col>)
        }
      </Row>
      <br/>
      <Row align="middle" style={{ justifyContent: 'center' }}>
        <span style={{ marginRight: 16 }}>Convert</span>
        <Select
          allowClear
          showSearch
          style={{ width: 200, marginRight: 16 }}
          placeholder="Select a pet"
          optionFilterProp="children"
          onChange={changePetSelect}
          onClear={clearPetSelect}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={quizOptions}
        />
        with a quantity
        <span style={{ marginLeft: 16, marginRight: 16 }}></span>
        <InputNumber min={0} defaultValue={0} value={selectedPetCount} />
      </Row>
      <List
        style={{ marginTop: 32 }}
        bordered
        dataSource={pagedItems}
        renderItem={item => {
          const id = item.id.toNumber();
          return (
            <List.Item key={`${id}_${item.uri}_${item.owner}`} style={{ alignItems: 'flex-start' }}>
              <Card
                title={
                  <div>
                    <span style={{ fontSize: 16, marginRight: 8 }}>#{id}</span> {item.name}
                  </div>
                }
              >
                <div>
                  <img src={item.image} style={{ maxWidth: 150 }} />
                </div>
                <div>{item.description}</div>
              </Card>

              <div>
                <div style={{ display: 'flex', marginBottom: 8 }}>
                  owner:&nbsp;&nbsp;
                  <Address
                    address={item.owner}
                    ensProvider={mainnetProvider}
                    blockExplorer={blockExplorer}
                    fontSize={16}
                  />
                </div>
                <div style={{ display: 'flex' }}>
                  <AddressInput
                    ensProvider={mainnetProvider}
                    placeholder="transfer to address"
                    value={transferToAddresses[id]}
                    onChange={newValue => {
                      const update = {};
                      update[id] = newValue;
                      setTransferToAddresses({ ...transferToAddresses, ...update });
                    }}
                  />
                  <Button
                    style={{ marginLeft: 4 }}
                    onClick={() => transfer(transferToAddresses[id], id)}
                  >
                    Transfer
                  </Button>
                </div>
                <div style={{ display: 'flex' }}>
                  {
                    selectedPetValue ? <div style={{ marginTop: 16 }}>{
                      convertQuiz.map(qz => 
                        <Button
                          style={{ marginRight: 8 }}
                          key={qz.key}
                          disabled={minting}
                          onClick={mint}
                          size="default"
                          type="primary"
                        >
                          Convert {qz.name}
                        </Button>)
                     }</div> : <span style={{ color: 'orange', marginTop: 16 }}>Please select one pet to convert</span>
                  }
                </div>
              </div>
            </List.Item>
          );
        }}
      />
      { dataSource.length > 0 && <Pagination
        style={{ marginTop: 16 }}
        pageSize={pageSize}
        total={dataSource.length}
        onChange={p => setPage(p)}
      /> }
    </div>
  );
}
