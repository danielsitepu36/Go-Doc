import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'USER';

export const loadUser = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data !== null) {
      return data;
    }
  } catch (error) {
    console.log('Error user loading', error);
  }
};

export const saveUser = async (data) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const clearUser = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
