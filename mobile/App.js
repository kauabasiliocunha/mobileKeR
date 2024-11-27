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