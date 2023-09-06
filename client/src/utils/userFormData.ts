export const userFormData = [
    {
        name: 'name',
        type: 'text',
        title: 'First name',
        errorMessage: 'First name is required and must contain from 3 to 40 chars.',
        minCharacters: 3,
    },
    {
        name: 'last_name',
        type: 'text',
        title: 'Last name',
        errorMessage: 'Last name is required  and must contain from 3 to 40 chars.',
        minCharacters: 3,
    },
    {
        name: 'email',
        type: 'email',
        title: 'Email',
        errorMessage: 'Email is required and must contain from 3 to 40 chars and "@".',
        minCharacters: 4,
    }
];
