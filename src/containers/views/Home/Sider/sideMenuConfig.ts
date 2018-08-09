
const menus = [
    {
        icon: 'lock',
        path: '/',
        permissions: ['user', 'admin'],
        title: '支持user和admin'
    },
    {
        icon: 'unlock',
        path: '/test2',
        permissions: ['user'],
        title: '支持user'
    },
    {
        icon: 'edit',
        path: '/test3',
        permissions: ['admin'],
        title: '支持admin'
    },
    {
        icon: 'file',
        path: '/test4',
        permissions: ['user'],
        title: '支持user'
    }
]

export default menus
