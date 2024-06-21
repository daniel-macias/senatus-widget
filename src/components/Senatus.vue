<template>
    <div>
      <h1>Application ID: {{ applicationId }}</h1>
      <h2>Message from GraphQL:</h2>
      <p>{{ message || 'Loading...' }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  
  interface GraphQLError {
    message: string;
  }
  
  interface GraphQLResponse {
    data: {
      sayHello: string;
    };
    errors?: GraphQLError[];
  }
  
  export default defineComponent({
    name: 'Senatus',
    props: {
      applicationId: {
        type: String,
        required: true,
      },
      apiUrl: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const message = ref('');
  
      onMounted(() => {
        console.log('Application ID:', props.applicationId);
        console.log('API URL:', props.apiUrl);
  
        fetch(props.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query {
                sayHello
              }
            `,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data: GraphQLResponse) => {
            if (data.errors) {
              throw new Error(data.errors.map((err: GraphQLError) => err.message).join(', '));
            }
            message.value = data.data.sayHello;
          })
          .catch((error) => console.error('Error fetching data:', error));
      });
  
      return { message };
    },
  });
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  