const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      demo: [
        {
          title: 'FIRST',
          background: 'white',
          initial: 'white',
        },
        {
          title: 'SECOND',
          background: 'white',
          initial: 'white',
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, 'green');
      },

      syncTokenFromSessionStorage: () => {
        const token = sessionStorage.getItem('token');
        console.log('This is the token from session storage', token);
        setStore({ token: null });
      },

      logout: () => {
        sessionStorage.removeItem('token');
        console.log('Logged out');
        if (token && token !== '' && token !== 'undefined')
          setStore({ token: token });
      },

      login: async (email, password) => {
        const opts = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };

        try {
          const resp = await fetch(
            'https://super-duper-engine-9v7rwx5xgqw3p99x-3001.preview.app.github.dev/api/token',
            opts
          );
          if (resp.status !== 200) {
            alert('There is an error');
            return false;
          }

          const data = await resp.json();
          console.log('this is the token', data.token);
          sessionStorage.setItem('token', data.token);
          setStore({ token: data.token });
          return true;
        } catch (error) {
          console.log('Error loggin in', error);
        }
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + '/api/hello');
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log('Error loading message from backend', error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
