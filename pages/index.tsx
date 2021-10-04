import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
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
    message: "Seu peso",
    indice: "15,5",
    altura: 1.5,
    cor: "red",
    peso: 1.6,
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
  const handleronChangeImcAltura = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.currentTarget.value = event.currentTarget.value
      .replace(/\w/g, (value) =>
        value == "." ? value : value.replace(/\D/, "")
      )
      .slice(0, 7);
    const altura = parseFloat(event.currentTarget.value.replace(/,/g, "."));
    console.log(altura);
    setImcValue((prevState) => ({ ...prevState, altura }));
  };
  const handleronChangeImcPeso = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.currentTarget.value = event.currentTarget.value
      .replace(/\w/g, (value) =>
        value == "." ? value : value.replace(/\D/, "")
      )
      .slice(0, 7);
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
            width="240"
            height="240"
            src={ImcImage}
          ></Image>
        </Center>
        <HStack color={imcValue?.cor}>
          <Text fontSize="xl">{imcValue?.message}:</Text>
          <Text>{imcValue?.indice}</Text>
        </HStack>
        <VStack as="form" onSubmit={handlerOnSubmitImc} width="72">
          <Heading>Calcular IMC</Heading>
          <Input
            type="text"
            onChange={handleronChangeImcAltura}
            required
            placeContent="Sua Altura"
          ></Input>
          <Input
            type="text"
            onChange={handleronChangeImcPeso}
            required
            placeContent="Seu Peso"
          ></Input>
          <Button width="full" type="submit">
            Calcular IMC
          </Button>
        </VStack>
      </VStack>
    </div>
  );
};

export default Home;
