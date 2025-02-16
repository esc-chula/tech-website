CREATE OR REPLACE FUNCTION public.notify_change()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    update_body text;
    id int;
BEGIN
    id := coalesce(new.id, old.id);
    update_body := json_build_object('id', id, 'resource', TG_TABLE_NAME, 'action', TG_OP) #>> '{}';

    PERFORM pg_notify('update_channel', update_body);

    RETURN NEW;
END
$function$
;

CREATE TRIGGER user_trigger AFTER INSERT OR UPDATE OR DELETE ON "User" FOR EACH ROW EXECUTE FUNCTION notify_change();

CREATE TRIGGER hackathon_ticket_trigger AFTER INSERT OR UPDATE OR DELETE ON "HackathonTicket" FOR EACH ROW EXECUTE FUNCTION notify_change();

CREATE TRIGGER hackathon_ticket_claim_trigger AFTER INSERT OR UPDATE OR DELETE ON "HackathonTicketClaim" FOR EACH ROW EXECUTE FUNCTION notify_change();
