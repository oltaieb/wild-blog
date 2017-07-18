import moment from 'moment'

let navbar = {
    templateUrl: 'js/components/common/navbar.html',
    controller: ['UsersService', '$state','$interval', function (UsersService, $state, $interval) {
        'use strict'
            
            // On créé une variable datetime qui lance le module moment

            this.datetime = moment();
            
            // On utilise le service interval d'angular pour avec un rafraichissement en temps réel

            $interval(function realtime() {
                this.datetime = moment();
            }, 1000),
            
            angular.extend(this, {
            $onInit() {
                UsersService.getCurrent().then((user) => {
                    this.user = user
                }).catch((err) => {

                })
            },
            disconnect() {
                UsersService.disconnect().then(() => {
                    Materialize.toast('Disconnected', 4000, 'toast-warning')
                    this.user = null
                    $state.reload()
                })
            }

        })

    }]
}

export default navbar
