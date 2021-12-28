Vue.component('v-section', {
    template: '#section',
})

//TODO: https://vuejs.org/v2/api/#Vue-component
Vue.component('v-sec-6-item', {
    template: '#sec_6_grid_item',
    // TODO: https://vuejs.org/v2/api/#props
    props: ['item']
})

Vue.component('v-button', {
    template: '#button',
    props: ['tag']
})

Vue.component('v-title', {
    template: '#title',
    props: {
        titleLevel: {
            type: [Number, String],
            default: 1
        },
        // textHtml: {}
    },
    //TODO: https://vuejs.org/v2/api/#computed
    computed: {
        tagName(){
            return `h${this.titleLevel}`
        }
    }
})
const app = new Vue({
    el: '#app',
    data: {
        items: []
    },
    /*TODO: https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks
    *  https://learn.javascript.ru/async-await
    * */
    async beforeMount() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=20')
        const users = await response.json()

        for (const user of users) {
            const userAlbum = await (await fetch('https://jsonplaceholder.typicode.com/albums?_limit=1&userId=' + user.id)).json()
            const album = userAlbum[0]

            const userPhoto = await (await fetch('https://jsonplaceholder.typicode.com/photos?_limit=1&albumId=' + album.id)).json()
            const photo = userPhoto[0]

            delete album.id
            delete photo.id

            // album.title += album.title
            // album.title += album.title

            this.items.push({
                ...user,
                ...photo,
                ...album,
            })
        }

        //https://vuejs.org/v2/api/#Vue-nextTick
        this.$nextTick(() => {
            this.runMasonry()
        })
    },
    methods: {
        runMasonry() {
            $('#comments').masonry({
                itemSelector: '.item',
                columnWidth: '.item',
                percentPosition: true,
                gutter: 24
            });
        }
    }
})
