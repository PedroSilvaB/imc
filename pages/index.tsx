import { Button } from "@chakra-ui/button";
import { Input, InputGroup } from "@chakra-ui/input";
import { Center, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ImcImage from "../assets/imc_image.png";
import React, { FormEvent, useState } from "react";

const Home: NextPage = () => {
  const [imcValue, setImcValue] = useState<{
    message: string;
    indice: string;
    altura: number;
    peso: number;
    cor: string;
  }>({
    message: "",
    indice: "",
    altura: 0,
    cor: "",
    peso: 0,
  });
  const handlerOnSubmitImc = (event: FormEvent) => {
    event.preventDefault();
    const { altura, peso } = imcValue;
    const indice = peso / (altura * altura);
    if (indice < 18.5) {
      console.log("Magreza", indice, { altura, peso });
      setImcValue((prevState) => ({
        ...prevState,
        indice: indice.toFixed(2),
        message: "Magreza",
        cor: "red",
      }));
    } else if (indice >= 18.5 && indice < 24.9) {
      console.log(indice, { altura, peso });
      setImcValue((prevState) => ({
        ...prevState,
        indice: indice.toFixed(2),
        message: "Normal",
        cor: "black",
      }));
    } else if (indice >= 24.9 && indice < 30) {
      console.log(indice, { altura, peso });
      setImcValue((prevState) => ({
        ...prevState,
        indice: indice.toFixed(2),
        message: "Sobrepeso",
        cor: "orange",
      }));
    } else {
      console.log(indice, { altura, peso });
      setImcValue((prevState) => ({
        ...prevState,
        indice: indice.toFixed(2),
        message: "Obesidade",
        cor: "red",
      }));
    }
  };
  function format(element: HTMLInputElement, max: number, decimal: number = 2) {
    let value: string = element.value.slice(0, max);
    value = value.replace(/[\D]+/g, "");
    const regex = new RegExp(`([0-9]{${decimal}})$`, "g");
    value = value.replace(regex, ",$1");
    element.value = value;
  }
  const handleronChangeImcAltura = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    format(event.currentTarget, 4);
    const altura = parseFloat(event.currentTarget.value.replace(/,/g, "."));
    console.log(altura);
    setImcValue((prevState) => ({ ...prevState, altura }));
  };
  const handleronChangeImcPeso = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    format(event.currentTarget, 7, 3);
    const peso = parseFloat(event.currentTarget.value.replace(/,/g, "."));
    console.log(peso);
    setImcValue((prevState) => ({ ...prevState, peso }));
  };
  return (
    <div>
      <Head>
        <title>Meu IMC</title>
        <meta name="description" content="Calcular Imc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack spacing="4" marginTop="16">
        <Center sx={{ img: { rounded: ["full"] } }}>
          <Image
            alt="Caculo de Imc"
            layout="intrinsic"
            objectFit="cover"
            width="160"
            height="160"
            src={ImcImage}
          ></Image>
        </Center>
        <HStack height="8" color={imcValue?.cor}>
          {imcValue?.message && <Text fontSize="xl">{imcValue?.message}:</Text>}
          <Text>{imcValue?.indice}</Text>
        </HStack>
        <VStack
          as="form"
          onSubmit={handlerOnSubmitImc}
          width="72"
          borderWidth="2px"
          padding="8"
          rounded="lg"
        >
          <Heading>Calcular IMC</Heading>
          <InputGroup flexDir="column">
            <Text margin="2" fontWeight="bold" fontSize="md">
              Sua Altura
            </Text>
            <Input
              type="text"
              onChange={handleronChangeImcAltura}
              required
              placeholder="Sua Altura"
            ></Input>
          </InputGroup>
          <InputGroup flexDir="column" gap="4">
            <Text marginX="2" marginBottom="2" fontWeight="bold" fontSize="md">
              Seu peso
            </Text>
            <Input
              type="text"
              onChange={handleronChangeImcPeso}
              required
              placeholder="Seu Peso"
            ></Input>
          </InputGroup>
          <Button width="full" type="submit">
            Calcular IMC
          </Button>
        </VStack>
      </VStack>
    </div>
  );
};

export default Home;
