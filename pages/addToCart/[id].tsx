import AddToCartPage from "@/components/AddToCart/AddToCartPage";
import MainLayout from "@/layout/MainLayout";
import { useRouter } from "next/router";
import React from "react";

function AddToCart() {

  const router = useRouter()
  const { id } = router.query

  return (
    <MainLayout>
      {id &&
        <AddToCartPage productId={Number(id)} />
      }
    </MainLayout>

  )
}

export default AddToCart