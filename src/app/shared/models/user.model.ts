/**
 * user class
 */
export class User {
    /**
     * user id
     */
    id: string ;
    /**
     *  name of the user
     */
    name: string;
    /**
     * username used
     */
    username: string;
    /**
     * the user's email
     */
    email: string;
    /**
     * address of the user
     */
    address: {
        name: string;
        suite: string;
        city: string;
        zipcode: string;
    /**
     * the geolocalisation of the user
    */
    geo: {
        lat: string;
        lng: string;
    };

};
/**
 * user's phone number
 */
phone: string;
website: string;

company: {
    name: string;
    catchPhrase: string;
        city: string;
        bs: string
                   };

}
