"use client";
import Image from "next/image";
import { RadioGroup, Radio } from "@headlessui/react";
import "../../globals.css";
import { useState, useEffect } from "react";
import css from "./components.module.css";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_TO_CART } from "../../../graphql/mutations";
import { CART_PRODUCTS } from "../../../graphql/query";

function DetailPage(props) {
  const [addingToCart, setAddingToCart] = useState(false);
  const { data, error, refetch } = useQuery(CART_PRODUCTS);
  const [cartCheck, setCartCheck] = useState(false);
  const { id, mainImg, title, price, img1, img2, description } = props.data;

  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART, {
    refetchQueries: [{ query: CART_PRODUCTS }],
  });

  const [removeProductToCart] = useMutation(REMOVE_PRODUCT_TO_CART, {
    refetchQueries: [{ query: CART_PRODUCTS }],
  });

  useEffect(() => {
    const isProductInCart = data?.order?.some((item) => item.id === id);
    setCartCheck(isProductInCart);
  }, [data]);

  if (!props?.data || props.data instanceof Error) {
    return <div>Error loading product details.</div>;
  }

  const addProductToCartHandler = async () => {
    setAddingToCart(true);
    try {
      await addProductToCart({
        variables: { id, mainImg, name: title, price },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setAddingToCart(false);
    }
  };

  const removeProductToCartHandler = async () => {
    setAddingToCart(true);
    try {
      await removeProductToCart({
        variables: { id },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setAddingToCart(false);
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const colors = [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ];

  const sizes = [
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);

  return (
    <div className={css.back}>
      <div className={css.maindiv}>
        <div className={css.imgs}>
          <Image
            src={mainImg}
            alt={title}
            width={400}
            height={100}
            className={css.mainImg}
          />
          <div className={css.imgdiv}>
            <Image src={img1} alt={title} width={200} height={150} />
            <Image src={img2} alt={title} width={200} height={150} />
          </div>
        </div>

        <div>
          <div className={css.toprow}>
            <h1>{title}</h1>
            <p>{price}$</p>
          </div>

          <div className={css.reviewsDiv}>
            <div className={css.starrating}>
              <span className={css.star}>&#9733;</span>
              <span className={css.star}>&#9733;</span>
              <span className={css.star}>&#9733;</span>
              <span className={css.star}>&#9733;</span>
              <span className={css.star}>&#9733;</span>
            </div>
            <p>See All reviews</p>
          </div>

          <div>
            <div>
              <label>Color</label>
              <fieldset aria-label="Choose a color" className="mt-4">
                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="flex items-center space-x-3"
                >
                  {colors.map((color) => (
                    <Radio
                      key={color.name}
                      value={color}
                      aria-label={color.name}
                      className={classNames(
                        color.selectedClass,
                        "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          color.class,
                          "size-8 rounded-full border border-black/10"
                        )}
                      />
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>
          </div>

          <div className={css.descriptionDiv}>
            <label className={css.descriptionLabel}>Description</label>
            <p className={css.description}>{description}</p>
          </div>
        </div>

        {cartCheck ? (
          <button
            className={css.cartButton}
            onClick={removeProductToCartHandler}
            style={{ backgroundColor: "#EA2F14" }}
          >
            Remove from list
          </button>
        ) : (
          <button
            onClick={addProductToCartHandler}
            className={css.cartButton}
          >
            {addingToCart ? "adding product..." : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
}

export default DetailPage;
