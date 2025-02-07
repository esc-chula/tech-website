import { OAuth2Client } from "@ory/hydra-client";
import { Card } from "~/components/ui/card";

interface OAuth2ClientCardProps {
    client: OAuth2Client
}

const OAuth2ClientCard: React.FC<OAuth2ClientCardProps> = ({ client }: OAuth2ClientCardProps) => {
    return (
        <Card>
            <h3>id: {client.client_id}</h3>
            <h3>secret: {client.client_secret}</h3>
            <h3>name: {client.client_name}</h3>
        </Card>
    )
}

export default OAuth2ClientCard;
