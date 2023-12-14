// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to retrieve user information: ${response.status} - ${response.statusText}`
        );
      }
      return response.json();
    });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to create user: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to log in: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    });
};

// save product data for a logged-in user
export const saveProduct = (productData, token) => {
  return fetch('/api/users/products', { // Modified endpoint for saving products
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to save product: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    });
};

// remove saved product data for a logged-in user
export const deleteProduct = (productId, token) => {
  return fetch(`/api/users/products/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    });
};

