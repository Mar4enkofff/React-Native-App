import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { Loading } from './Loading';

export const FullPostScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const { id, title } = route.params;

   const fetchData = useCallback(async () => {
     setIsLoading(true);
     navigation.setOptions({ title });
     try {
      const response = await axios.get('https://6672ab8b6ca902ae11b140c1.mockapi.io/2024/ReactNative1/' + id);
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>

    )
  }

  return (
    <View styles={styles.container}>
      <Image style={styles.image} source={{ uri: data.imageUrl }}/>
      <Text style={styles.text}>
        {data.text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    borderRadius: 10,
    width: 360,
    height: 260,
    marginBottom: 15,
    objectFit: 'contain'
  },
  text: {
    padding: 10,
    fontSize: 18,
    lineHeight: 25,
  },
});