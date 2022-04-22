import React, { useState } from 'react';
import { Button } from '../../components/Forms/Button';
import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles';

export function Register() {
  const [transactionsType, setTransactionsType] = useState('');

  function handleTransactionsTypeSelect(type: string) {
    setTransactionsType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input
            placeholder="Nome"
          />
          <Input
            placeholder="Preço"
          />

          <TransactionsTypes>
            <TransactionTypeButton
              title="Income"
              type="up"
              isActive={transactionsType === 'up'}
              onPress={() => handleTransactionsTypeSelect('up')}
            />
            <TransactionTypeButton
              title="Outcome"
              type="down"
              isActive={transactionsType === 'down'}
              onPress={() => handleTransactionsTypeSelect('down')}
            />
          </TransactionsTypes>
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  )
}