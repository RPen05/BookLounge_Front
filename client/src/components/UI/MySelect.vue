<script>
export default {
  name: 'my-select',
  props:{
    modelValue:{
      type: String
    },
    options:{
      type: Array,
      default: () => []
    }
  },
  methods:{
    changeOptions(event){
      this.$emit('update:modelValue', event.target.value)
    }
  },
}
</script>

<template>
  <select :value="modelValue" @change="changeOptions" class="select">
    <option disabled value="">Выберите из списка</option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        class="option"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<style scoped>
  .select{
    background-color: #ffffff;
    color: black;
    width: 200px;
    height: 40px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
  }


</style>