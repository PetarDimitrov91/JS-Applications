<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Demo</title>
    <style>
        label {
            display: block;
        }
    </style>
</head>

<body>
    <a href="/auth.html">Login / Register</a>
    <form>
        <label>Person: <input type="text" name="person" /></label>
        <label>Phone: <input type="text" name="phone" /></label>
        <input type="submit" value="Create Record" />
    </form>


    <script>
        const form = document.querySelector('form');
        form.addEventListener('submit', onSubmit);

        async function onSubmit(event) {
            event.preventDefault();
            const data = new FormData(form);

            const person = data.get('person').trim();
            const phone = data.get('phone').trim();

            const record = { person, phone };

            const result = await postData(record);

            form.reset();
            alert('Record created');
        }

        async function getData() {
            const url = 'http://localhost:3030/jsonstore/phonebook';

            const options = { headers: {} };

            const token = sessionStorage.getItem('token');
            if (token !== null) {
                options.headers['X-Authorization'] = token;
            }

            const res = await fetch(url, options);
            const data = await res.json();

            return data;
        }

        async function getDataById(id) {
            const url = 'http://localhost:3030/jsonstore/phonebook/' + id;

            const res = await fetch(url);
            const data = await res.json();

            return data;
        }

        async function postData(data) {
            const url = 'http://localhost:3030/jsonstore/phonebook';

            const options = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            try {
                const res = await fetch(url, options);
                if (res.ok != true) {
                    throw new Error(res.statusText);
                }

                const result = await res.json();

                return result;
            } catch (err) {

            }
        }

        async function updateData(id, data) {
            const url = 'http://localhost:3030/jsonstore/phonebook/' + id;

            const options = {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            const res = await fetch(url, options);
            const result = await res.json();

            return result;
        }

        async function deleteData(id) {
            const url = 'http://localhost:3030/jsonstore/phonebook/' + id;

            const options = {
                method: 'delete'
            };

            const res = await fetch(url, options);
            const result = await res.json();

            return result;
        }
    </script>
</body>

</html>