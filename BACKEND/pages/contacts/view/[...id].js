
import Head from "next/head";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";

export default function Contactview() {
    const router = useRouter();
    const { id } = router.query;
    const contactId = Array.isArray(id) ? id[0] : id;

    const apiEndpoint = contactId ? `/api/contacts?id=${contactId}` : null;
    const { allData, loading } = useFetchData(apiEndpoint);
    const contact = allData || null; // API returns single object when id is present

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const d = new Date(dateString);
        if (isNaN(d.getTime())) return "-";
        return d.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    };

    if (loading || !contactId) {
        return (
            <div className="flex flex-center wh_100">
                <Spinner />
            </div>
        );
    }

    if (!contact) {
        return <div className="flex flex-center wh_100">Không tìm thấy liên hệ</div>;
    }

    return (
        <>
            <Head>
                <title>Contact: {contact?.email || contact?.name || "Details"}</title>
            </Head>

            <div className="container contact-view-layout">
                <div>
                    <h1 className="contact-view-title">Contact: {contact?.email || "N/A"}</h1>
                    <p className="contact-view-subtitle">ADMIN PANEL</p>
                </div>

                <div className="contact-view-card">
                    <div className="contact-view-grid">
                        <div>
                            <h4>Name:</h4>
                            <p>{contact.name || "-"}</p>
                        </div>
                        <div>
                            <h4>Last name:</h4>
                            <p>{contact.lname || "-"}</p>
                        </div>
                        <div>
                            <h4>Email:</h4>
                            <p>{contact.email || "-"}</p>
                        </div>
                        <div>
                            <h4>Company:</h4>
                            <p>{contact.company || "-"}</p>
                        </div>
                        <div>
                            <h4>Phone:</h4>
                            <p>{contact.phone || "-"}</p>
                        </div>
                        <div>
                            <h4>Country:</h4>
                            <p>{contact.country || "-"}</p>
                        </div>
                        <div>
                            <h4>Projects:</h4>
                            <p>{(contact.project || []).join(", ") || "-"}</p>
                        </div>
                      
                        <div >
                            <h4>Description:</h4>
                            <p>{contact.description || "-"}</p>
                        </div>
                        <div>
                            <h4>Contact time:</h4>
                            <p>{formatDate(contact.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
