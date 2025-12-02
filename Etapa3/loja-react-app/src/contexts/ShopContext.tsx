import React, { createContext, useContext, useState } from "react";

import * as ImagePicker from 'expo-image-picker';

type ShopContextType = {
    cartItems: any[];
    addToCart: (item: any) => Promise<void>;
@@ -14,6 +16,8 @@
export const ShopProvider: React.FC<{ children: React.ReactNode}> = ({ children}) => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [orderInfo, setOrderInfo] = useState<any[]>([]);
    const [editingItem, setEditingItem] = useState<any[]>([]);
    const [newImage, setNewImage] = useState('');

    const addToCart = async (item: any, quantity: number = 1) => {
        setCartItems(prevItems => {
@@ -55,14 +59,37 @@
        setOrderInfo(orderInfo);
    }

    // Image picker.
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                // mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 1,
            });
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const imageUri = result.assets[0].uri;
                console.log('Image uri', imageUri);
                setNewImage(imageUri);
            }
            else {
                console.log('A seleção de imagem foi cancelada');
            }
        }
        else {
            console.log('Sem permissão para acessar as mídias');
        }
    }

    return (
        <ShopContext
            value={ { cartItems, addToCart, removeFromCart, getTotalPrice, clearCart, orderInfo, lastOrderInfo } }
            value={ { cartItems, addToCart, removeFromCart, getTotalPrice, clearCart, orderInfo, lastOrderInfo, editingItem, setEditingItem, newImage, pickImage } }
        >
            {children}
        </ShopContext>
    );
}

export const useShop = () => useContext(ShopContext);
~