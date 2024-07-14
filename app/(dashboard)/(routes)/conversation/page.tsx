import Heading from "@/components/heading";
import ConversationForm from "@/components/ui/conversation-form";
import { MessageSquare } from "lucide-react";

export default function ConversationPage() {
    return (
        <div className="flex flex-col h-screen">
            <Heading
                title="Conversation"
                description="Our most conversation model."
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <ConversationForm />
        </div>
    );
}
