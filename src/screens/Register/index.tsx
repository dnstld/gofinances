import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles';

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });
  const [transactionsType, setTransactionsType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleTransactionsTypeSelect(type: string) {
    setTransactionsType(type);
  }

  function handleSelectCategoryModal() {
    setCategoryModalOpen(!categoryModalOpen);
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

          <CategorySelectButton
            title={category.name}
            onPress={handleSelectCategoryModal}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleSelectCategoryModal}
        />
      </Modal>
    </Container>
  )
}