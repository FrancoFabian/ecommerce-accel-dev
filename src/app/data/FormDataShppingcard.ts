type FormValueKeys =
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'address'
    | 'lugardeenvio'
    | 'city'
    | 'pais'
    | 'codigopostal'
    | 'numberPhone';

interface InputConfig {
    name: FormValueKeys;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
}
// Array of input configurations
export const inputGroups: { inputs: InputConfig[] }[] = [
    // Single input
    {
        inputs: [
            {
                name: 'email',
                label: 'Dirección de correo electrónico',
                type: 'email',
                placeholder: 'Enter your email',
                required: true,
            },
        ],
    },
    // Row of inputs
    {
        inputs: [
            {
                name: 'firstName',
                label: 'Nombre de pila',
                type: 'text',
                placeholder: 'Enter your first name',
                required: true,
            },
            {
                name: 'lastName',
                label: 'Apellido',
                type: 'text',
                placeholder: 'Enter your last name',
                required: true,
            },
        ],
    },
    // Another row of inputs
    {
        inputs: [
            {
                name: 'address',
                label: 'Dirección',
                type: 'text',
                placeholder: 'Lane 1, Street 1',
                required: true,
            },
            {
                name: 'lugardeenvio',
                label: 'Apt, suite, etc.',
                type: 'text',
                placeholder: 'Apartamento, estudio, o piso',
                required: true,
            },
        ],
    },
    // Continue with other inputs...
    {
        inputs: [
            {
                name: 'city',
                label: 'Ciudad',
                type: 'text',
                placeholder: 'Introduce tu ciudad',
                required: true,
            },
            {
                name: 'pais',
                label: 'País',
                type: 'text',
                placeholder: 'Seleccione un país',
                required: true,
            },
        ],
    },
    {
        inputs: [
            {
                name: 'codigopostal',
                label: 'Código postal',
                type: 'number',
                placeholder: '12345',
                required: true,
            },
            {
                name: 'numberPhone',
                label: 'Número de teléfono',
                type: 'number',
                placeholder: '+1 (555) 555-5555',
                required: true,
            },
        ],
    },
];