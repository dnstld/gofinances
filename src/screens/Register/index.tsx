import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { InputForm } from '../../components/Forms/InputForm';
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

interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });
  const [transactionsType, setTransactionsType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const schema = Yup.object().shape({
    name: Yup
      .string()
      .required('Nome é obrigatório'),
    amount: Yup
      .number()
      .typeError('Informe um valor numérico')
      .positive('O valor não pode ser negativo')
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });


  function handleTransactionsTypeSelect(type: string) {
    setTransactionsType(type);
  }

  function handleSelectCategoryModal() {
    setCategoryModalOpen(!categoryModalOpen);
  }

  function handleRegister(form: FormData) {
    if (!transactionsType) {
      return Alert.alert('Selecione o tipo da trancação');
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }



    const data = {
      name: form.name,
      amount: form.amount,
      transactionsType,
      category: category.key
    }
    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
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

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}