import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';



export default function App() {
    const [pais, setPais] = useState("");
    const [tela, setTela] = useState("inicial");
    const [perguntas, setPerguntas] = useState([]);
    const [respostas, setRespostas] = useState({});
    const [resultado, setResultado] = useState(null);
    const [perguntasErradas, setPerguntasErradas] = useState([]);










//*Perguntas Pais RAi//









    

    useEffect(() => {
        const buscarPais = async (latitude, longitude) => {
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
            try {
                const resposta = await axios.get(url, {
                    headers: { 'User-Agent': 'SeuApp/1.0' }
                });
                const endereco = resposta.data.address;
                if (endereco && endereco.country) {
                    let paisObtido = endereco.country;
                    if (paisObtido.includes("Comores") || paisObtido.includes("Komori") || paisObtido.includes("جزر القمر")) {
                        paisObtido = "Comores";
                    }
                    return paisObtido;
                }
            } catch (erro) {
                console.error(erro);
            }
            return null;
        };






//**buscar coordenadas */





        const enviarRespostas = () => {
            let acertos = 0;
            let erradas = [];
    
    
            perguntas.forEach((p, indice) => {
                if (respostas[indice] === p.resposta) {
                    acertos++;
                } else {
                    erradas.push(p);
                }
            });
    
    
            setResultado(acertos);
            setPerguntasErradas(erradas);
            setTela("resultado");
        };
    
    
        if (tela === "inicial") {
            return (
                <View style={styles.container}>
                    <Text style={styles.paragraph}>Geolocalização</Text>
                    <Text style={styles.t2}>{pais ? `Você está no país: ${pais}` : "Carregando..."}</Text>
                    <View style={styles.botao}>
                        <Button
                            color={'#205e53'}
                            title="Iniciar Quiz"
                            onPress={() => {
                                if (perguntas.length > 0) {
                                    setTela("quiz");
                                } else {
                                    alert("Desculpe, o quiz não está disponível para seu país.");
                                }
                            }}
                        />
                    </View>
                </View>
            );
        }
    