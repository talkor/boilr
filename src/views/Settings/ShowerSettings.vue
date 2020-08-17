<template>
  <div class="shower">
    <BackButton />
    <Title text="Shower Settings" />
    <NumberInput
      label="Default shower time"
      :defaultTime="time.defaultShowerTime"
      @input="onDefaultChange"
    />
    <Button
      class="button"
      :noBorder="false"
      :noPadding="false"
      :rounded="false"
      :text="save"
      @click="onSave"
    />

  </div>
  
</template>


<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { reactive } from '@vue/composition-api';
import NumberInput from '@/components/core/NumberInput';
import BackButton from '@/components/core/BackButton';
import Title from '@/components/core/Title';
import { getUserData, postUserData } from '@/services/userService';
import { ref, onMounted } from '@vue/composition-api';
import Button from '@/components/core/Button';

export default {
  setup(props, { root }) {
    const router = root.$router;
    let userData;
    let newDefaultTime;
    const save = "Save";

    const time = reactive({
      defaultShowerTime: ''
    });

    onMounted(async () => {
      userData = await getUserData();
      time.defaultShowerTime = userData.defaultShowerTime;
    });

    const onDefaultChange = (value) => {
      newDefaultTime = value;
    };

    const onSave = () => {
      postUserData({ defaultShowerTime: newDefaultTime });
      router.push({ name: 'Settings'
                 });
    }

    return {
      onDefaultChange,
      onSave,
      newDefaultTime,
      time,
      save
    };
  },
  components: {
    NumberInput,
    BackButton,
    Title,
    Button
  }
};
</script>

<style scoped lang="scss">
.button {
	box-shadow:inset 0px 1px 0px 0px #bbdaf7;
	background:linear-gradient(to bottom, #79bbff 5%, #378de5 100%);
	background-color:#79bbff;
	border-radius:6px;
	border:1px solid #84bbf3;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #528ecc;
}
.button:active {
	position:relative;
	top:1px;
}

</style>
