import config from './config';

export default class Data {
    // api method used to make GET and POST requests to the REST API
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        // Using bota to encode the emailAddress and password of the authenticated user
        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`)
            options.headers['Authorization'] = `Basic ${encodedCredentials}`
        }
        return fetch(url, options);
    }

    // GET users call to API backend
    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    // POST call to API backend
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data;
            })
        }
        else {
            throw new Error();
        }
    }

    // GET call to API backend
    async getCourses() {
        const response = await this.api("/courses", "GET");
        if (response.status === 200) {
            const courses = await response.json().then((data) => data);
            return courses;
        } else if (response.status === 401) {
            return response.json().then(data => {
                return data;
                // return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    // PUT call to API backend
    async updateCourse(id, course, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password })
        if (response.status === 204) {
            return response;
        }
        else if (response.status === 401) {
            return response.json().then(data => {
                return data;
                // return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    // POST call to update course
    async createCourse(course, emailAddress, password) {
        const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });
        if (response.stats === 201) {
            return [];
        } else if ( response.status === 400 ) {
            return response.json().then(data => {
                return data;
            });
        } else {
            throw new Error();
        }
    }

    // GET specific course ID
    async detCourseDetails(id) {
        const response = await this.api(`/courses/${id}`, "GET");
        if (response.status === 200) {
            const course = await response.json().then((data) => data);
            return course;
        } else if (response.status === 401) {
            return response.json().then(data => {
                return data;
            });
        } else {
            throw new Error();
        }
    }

    // DELETE course of a specific ID
    async deleteCourse(id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, "DELETE", null, true, { emailAddress, password });
        if (response.status === 204) {
            return [];
        } else if (response.status === 401) {
            return response.json().then(data => {
                return data;
            });
        } else {
            throw new Error();
        }
    }

    
}