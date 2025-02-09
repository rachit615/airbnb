"use client";
import React, { useMemo } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { useRouter } from "next/navigation";
import useRentModal from "@/app/hooks/useRentModal";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      description: "",
      title: "",
      price: 1,
    },
  });

  const category = watch("category");
  const location = watch("location");
  const roomCount = watch("roomCount");
  const guestCount = watch("guestCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const [isLoading, setIsLoading] = useState(false);

  const goNext = () => {
    setStep((value) => value + 1);
  };

  const goBack = () => {
    setStep((value) => value - 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return "undefined";
    }
    return "Back";
  }, [step]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return goNext();
    }
    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created successfully");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              key={item.label}
              icon={item.icon}
              label={item.label}
              selected={category === item.label}
              onClick={(category) => setCustomValue("category", category)}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located ?"
          subtitle="Help guests find you"
        />
        <CountrySelect
          value={location}
          onChange={(location) => setCustomValue("location", location)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Share some basics about your place"
          subtitle="what amenities do you have ?"
        />
        <Counter
          onChange={(value) => setCustomValue("guestCount", value)}
          value={guestCount}
          title="Guests"
          subTitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomCount}
          title="Rooms"
          subTitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
          title="Bathrooms"
          subTitle="How many bathrooms do you have?"
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Add a photo of your place"
          subtitle="show guests what your place looks like"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="How would you describe your place ?"
          subtitle="short and sweet works best"
        />
        <Input
          id="title"
          label="Title"
          register={register}
          required={true}
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id="description"
          label="Description"
          register={register}
          required={true}
          errors={errors}
          disabled={isLoading}
        />
      </div>
    );
  }
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Now set your price"
          subtitle="How much do you charge per night?"
        />

        <Input
          id="price"
          label="Price"
          register={register}
          required={true}
          formatPrice
          type="number"
          errors={errors}
          disabled={isLoading}
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Airbnb your home"
      body={bodyContent}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : goBack}
      disabled={isLoading}
    />
  );
};

export default RentModal;
