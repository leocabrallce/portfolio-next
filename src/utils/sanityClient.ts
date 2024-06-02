import { createClient } from "next-sanity";
import config from "@/sanity/config/client";

const client = createClient(config);

export default client;
