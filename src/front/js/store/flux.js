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

      signup: async (email, password, confirmPassword) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
          alert('Please enter a valid email');
          return false;
        }

        if (!password || password !== confirmPassword) {
          alert('Passwords do not match or are empty');
          return false;
        }

        return true;
      },

      syncTokenFromSessionStorage: () => {
        const token = sessionStorage.getItem('token');
        console.log('This is the token from session storage', token);
        if (token && token !== '' && token !== 'undefined')
          setStore({ token: token });
      },

      logout: () => {
        sessionStorage.removeItem('token');
        console.log('Logged out');
        setStore({ token: null });
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
            process.env.BACKEND_URL + '/api/token',
            opts
          );
          if (resp.status !== 201) {
            console.log('Error loggin in');
            return false;
          }

          const data = await resp.json();
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
          const resp = await fetch(process.env.BACKEND_URL + '/api/home');
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
