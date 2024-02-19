import React from "react";
import { Flex, Text, Button } from "@radix-ui/themes";
import Link from "next/link";

const IssuePage = () => {
  return (
    <main>
      <Button>
        <Link href="/issues/new"> New Issue</Link>
      </Button>
    </main>
  );
};

export default IssuePage;
