import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { palette } from '../../constants/Colors';

const ListItems: React.FC<{
  IconComponent: any;
  renderLeftActions: any;
  onPress: any;
  title: string;
  subTitle: string;
  image: any;
}> = ({
  IconComponent,
  renderLeftActions,
  onPress,
  title,
  subTitle,
  image,
}) => {
  return (
    <GestureHandlerRootView>
      <Swipeable renderLeftActions={renderLeftActions}>
        <TouchableHighlight underlayColor={palette.gray} onPress={onPress}>
          <View style={styles.container}>
            {IconComponent}
            {image && <Image style={styles.image} source={image} />}
            <View style={styles.detailsContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.subTitle} numberOfLines={1}>
                {subTitle}
              </Text>
            </View>
            <MaterialCommunityIcons
              name='chevron-double-right'
              size={25}
              color={palette.secondary}
            />
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: palette.white,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  subTitle: {
    color: palette.secondary,
  },
  title: {
    fontWeight: '700',
  },
});

export default ListItems;
