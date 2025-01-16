"use client";
import Image from "next/image";
import { RadioGroup, Radio } from "@headlessui/react";
import "../.././globals.css";
import { useState } from "react";
import css from "./components.module.css";

function DetailPage(props) {

  const { mainImg , title , price , img1 , img2 , description } = props.data;

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
            <Image
              src={img1}
              alt={title}
              width={200}
              height={150}
            />
            <Image
              src={img2}
              alt={title}
              width={200}
              height={150}
            />
          </div>
        </div>

        <div>
          <div className={css.toprow}>
            <h1>{title}</h1>
            <p>{price}</p>
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

            {/* {sizes && <div>
              <label>Size</label>

              <fieldset aria-label="Choose a size" className="mt-4">
                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                >
                  {sizes.map((size) => (
                    <Radio
                      key={size.name}
                      value={size}
                      disabled={!size.inStock}
                      className={classNames(
                        size.inStock
                          ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                          : "cursor-not-allowed bg-gray-50 text-gray-200",
                        "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                      )}
                    >
                      <span>{size.name}</span>
                      {size.inStock ? (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                        >
                          <svg
                            stroke="currentColor"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            className="absolute inset-0 size-full stroke-2 text-gray-200"
                          >
                            <line
                              x1={0}
                              x2={100}
                              y1={100}
                              y2={0}
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        </span>
                      )}
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>} */}
          </div>

          <div className={css.descriptionDiv}>
            <label className={css.descriptionLabel}>Description</label>
            <p className={css.description}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
