const BASE_URL = "http://localhost:4001";

export const AllEmployees = async (search = "", page = 1, limit = 5) => {
    const url = `${BASE_URL}/api/employees?search=${search}&page=${page}$limit=${limit}`;
    try {
        const options = {
            method: "GET",
            "Content-Type": "application/json"
        }
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
};

export const CreateEmployees = async (empObj) => {
    const url = `${BASE_URL}/api/employees`;
    try {
        const formData = new FormData();

        for (const key in empObj) {
            // Convert arrays to JSON strings before appending
            if (Array.isArray(empObj[key])) {
                formData.append(key, JSON.stringify(empObj[key]));
            } else {
                formData.append(key, empObj[key]);
            }
        }
        const options = {
            method: "POST",
            body: formData
        }
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
};

export const UpdateEmployees = async (empObj, id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    try {
        const formData = new FormData();

        for (const key in empObj) {
            // Convert arrays to JSON strings before appending
            if (Array.isArray(empObj[key])) {
                formData.append(key, JSON.stringify(empObj[key]));
            } else {
                formData.append(key, empObj[key]);
            }
        }
        const options = {
            method: "PUT",
            body: formData
        }
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
};

export const DeleteEmployeeId = async (id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    try {
        const options = {
            method: "DELETE"
        }
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
};