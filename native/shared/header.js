import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput, ViewStyle, TextStyle, TextInputProps, Input, Button, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import MenuIcon from './images/MenuIcon.jpg';
import loginIcon from './images/loginIcon.webp';
import axios from 'axios';

//recoil
import { useRecoilState } from "recoil-react-native";
import { userState } from './Atoms/userState';

export default function Header({ title }) {
    const navigation = useNavigation();

    const [user, setUser] = useRecoilState(userState);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [logIn, setLogIn] = useState(true)

    const { control, handleSubmit, errors } = useForm();

    const onSubmit = async (data) => {
        const { emailLogin, passwordLogin, name, emailSignin, passwordSignin } = data;
        console.log(emailLogin, passwordLogin, name, emailSignin, passwordSignin)

        if (emailLogin) {
            console.log("login")
            const { data } = await axios.post('http://10.0.2.2:8080/api/users/login', {
                email: emailLogin,
                password: passwordLogin,
            })
            if (data) {
                console.log(data)
                setUser(data.user);
            }
        } else {
            console.log("sign in")
            const { data } = await axios.post('http://10.0.2.2:8080/api/users/signup', {
                name: name,
                email: emailSignin,
                password: passwordSignin,
            })
            if (data) {
                console.log(data)
                setUser(data.user);
            }
        }
        setModalIsOpen(false)
    };
    const openMenu = () => {
        navigation.openDrawer();
    }

    const login = () => {
        setModalIsOpen(prev => !prev);
    }

    const userLink = () => {
        navigation.navigate('User', {
            userId: user.id
        })
    }

    const stylesSheet = StyleSheet.create({
        header: {
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            right: title === 'Home' ? null : 16,
        },
    })

    return (
        <View style={stylesSheet.header}>
            <TouchableOpacity onPress={openMenu} style={styles.menuOpacity}>
                <Image
                    source={MenuIcon}
                    style={styles.MenuIcon}
                />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
            {user ?
                <TouchableOpacity onPress={() => userLink()} style={styles.loginOpacity}>
                    <View style={styles.userIcon}>
                        <Text style={styles.userIconLetters}>{user.name.split(' ').map(letter => letter.charAt(0).toUpperCase())}</Text>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={login} style={styles.loginOpacity}>
                    <Image
                        source={loginIcon}
                        style={styles.loginIcon}
                    />
                </TouchableOpacity>
            }
            <Modal
                animationType="fade"
                // transparent={true}
                visible={modalIsOpen}
                onRequestClose={() => {
                    setModalIsOpen(false)
                }}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.centeredView}>
                        {logIn ?
                            <View>
                                <View>
                                    <Text style={styles.header}>Log - In</Text>
                                    <Controller
                                        control={control}
                                        render={({ onChange, onBlur, value }) => (
                                            <View style={styles.viewLabel}>
                                                <Text style={styles.label}>E-mail:</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    onBlur={onBlur}
                                                    onChangeText={value => onChange(value)}
                                                    value={value}
                                                    placeholder={"email"}
                                                />
                                            </View>
                                        )}
                                        name="emailLogin"
                                        rules={{ required: true }}
                                        defaultValue=""
                                    />
                                    {errors.emailLogin && <Text>E-mail is required.</Text>}

                                    <Controller
                                        control={control}
                                        render={({ onChange, onBlur, value }) => (
                                            <View style={styles.viewLabel}>
                                                <Text style={styles.label}>Password:</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    onBlur={onBlur}
                                                    onChangeText={value => onChange(value)}
                                                    value={value}
                                                    placeholder="password"
                                                    secureTextEntry={true}
                                                />
                                            </View>
                                        )}
                                        name="passwordLogin"
                                        rules={{ required: true }}
                                        defaultValue=""
                                    />
                                    {errors.passwordLogin && <Text>Password is required.</Text>}
                                    <Button title="Submit" onPress={handleSubmit(onSubmit)} />
                                </View>
                                <View>
                                    <Text style={styles.signIn}>Does not have an account?</Text>
                                    <Button title="Sign In" onPress={() => setLogIn(false)} />
                                </View>
                            </View>
                            :
                            <View>
                                <View>
                                    <Text style={styles.header}>Sign - In</Text>
                                    <Controller
                                        control={control}
                                        render={({ onChange, onBlur, value }) => (
                                            <View style={styles.viewLabel}>
                                                <Text style={styles.label}>Name:</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    onBlur={onBlur}
                                                    onChangeText={value => onChange(value)}
                                                    value={value}
                                                    placeholder={"Full - Name"}
                                                />
                                            </View>
                                        )}
                                        name="name"
                                        rules={{ required: true }}
                                        defaultValue=""
                                    />
                                    {errors.name && <Text>Name is required.</Text>}

                                    <Controller
                                        control={control}
                                        render={({ onChange, onBlur, value }) => (
                                            <View style={styles.viewLabel}>
                                                <Text style={styles.label}>E-mail:</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    onBlur={onBlur}
                                                    onChangeText={value => onChange(value)}
                                                    value={value}
                                                    placeholder={"username"}
                                                />
                                            </View>
                                        )}
                                        name="emailSignin"
                                        rules={{ required: true }}
                                        defaultValue=""
                                    />
                                    {errors.emailSignin && <Text>E-mail is required.</Text>}

                                    <Controller
                                        control={control}
                                        render={({ onChange, onBlur, value }) => (
                                            <View style={styles.viewLabel}>
                                                <Text style={styles.label}>Password:</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    onBlur={onBlur}
                                                    onChangeText={value => onChange(value)}
                                                    value={value}
                                                    placeholder="password"
                                                    secureTextEntry={true}
                                                />
                                            </View>
                                        )}
                                        name="passwordSignin"
                                        rules={{ required: true }}
                                        defaultValue=""
                                    />
                                    {errors.passwordSignin && <Text>Password is required.</Text>}
                                    <Button title="Submit" onPress={handleSubmit(onSubmit)} />
                                </View>
                                <View>
                                    <Text style={styles.signIn}>Already have an account?</Text>
                                    <Button title="Log In" onPress={() => setLogIn(true)} />
                                </View>
                            </View>
                        }
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View >
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        letterSpacing: 1,
    },
    MenuIcon: {
        height: 40,
        width: 40,
    },
    loginIcon: {
        height: 40,
        width: 40,
    },
    menuOpacity: {
        position: 'absolute',
        top: -5,
        left: 16,
        height: 20,
        width: 20,
    },
    loginOpacity: {
        position: 'absolute',
        top: -5,
        right: 16,
        height: 20,
        width: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: '#494f52',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        letterSpacing: 1,
        textAlign: 'center',
    },
    viewLabel: {
        padding: 10,
        borderWidth: 2,
        borderColor: 'white',
        margin: '2%',
    },
    label: {
        color: 'white',
        textAlign: 'center',
        margin: '2%',
    },
    input: {
        borderWidth: 1,
        fontSize: 20,
        width: 200,
        borderColor: 'white',
        color: 'white',
        paddingHorizontal: '5%',
        textAlign: 'center',
    },
    signIn: {
        color: 'white',
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'red',
    },
    userIcon: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'white',
        width: 30,
        height: 30,
        top: 4,
    },
    userIconLetters: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '5%',
    }
});
