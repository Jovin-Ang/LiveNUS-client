/**
 * Interface representing a page object
 */
interface Page {
    /** URI path to the page relative to root */
    route: string;
    /** Name of the page */
    name: string;
}

export default Page;
