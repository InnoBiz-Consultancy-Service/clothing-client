export interface navProps {
    _id: string;
    title: string;
    link: string;
    items: [
        {
            name: string;
            link: string;
        }
    ]
}