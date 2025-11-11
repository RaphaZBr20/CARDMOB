import React, { useState } from "react";
import { 
  View, 
  TextInput, 
  Button, 
  StyleSheet, 
  Text, 
  SafeAreaView,
  Alert,
  ActivityIndicator
} from "react-native";
import { requestRegister } from "../services/authService";

export default function RegisterScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'A senha deve ter pelo menos 8 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.password && !newErrors.confirmPassword;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpa erro específico do campo quando usuário começa a digitar
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await requestRegister(formData.name, formData.email, formData.password);
      
      Alert.alert(
        'Sucesso', 
        'Usuário cadastrado com sucesso! Agora você pode fazer login.',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.navigate('Login') 
          }
        ]
      );
    } catch (error: any) {
      Alert.alert('Erro no Cadastro', error.message || 'Erro ao cadastrar usuário');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Criar Nova Conta</Text>
        
        <Text>Nome completo:</Text>
        <TextInput 
          style={[styles.input, errors.name ? styles.inputError : null]}
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          placeholder="Digite seu nome completo"
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        <Text>E-mail:</Text>
        <TextInput 
          style={[styles.input, errors.email ? styles.inputError : null]}
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          placeholder="Digite seu e-mail"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <Text>Senha:</Text>
        <TextInput 
          style={[styles.input, errors.password ? styles.inputError : null]}
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          placeholder="Digite sua senha (mín. 8 caracteres)"
          secureTextEntry
          autoCapitalize="none"
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        <Text>Confirmar Senha:</Text>
        <TextInput 
          style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
          value={formData.confirmPassword}
          onChangeText={(text) => handleInputChange('confirmPassword', text)}
          placeholder="Confirme sua senha"
          secureTextEntry
          autoCapitalize="none"
        />
        {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

        {isLoading ? (
          <ActivityIndicator size="large" color="#1976d2" style={styles.loader} />
        ) : (
          <Button 
            title="Cadastrar" 
            onPress={handleRegister} 
          />
        )}

        <Button 
          title="Voltar para Login" 
          onPress={() => navigation.navigate('Login')} 
          color="#666"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 8,
    borderRadius: 4,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 12,
  },
  loader: {
    marginVertical: 20,
  },
});