import React from "react";
import {useForm} from "react-hook-form";

const EditMovieForm = ({onUpdate, movie}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm(
        {
            defaultValues: movie
        }
    );

    const onFormSubmit = (data) => {
        console.log(data);
        onUpdate(data);
        reset();
    }
    
    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div>
                <label>Movie name:</label>
                <input {...register("title", { required: "Name is required"})}
                    placeholder="Movie name"/>
                {errors.title && <span>{errors.title.message}</span>}
            </div>

            <div>
                <label>Hall:</label>
                <input type="number" {...register("hall",
                { required: "Hall is required",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Hall must be between 1 and 12"
                  },
                  max: {
                    value: 12,
                    message: "Hall must be between 1 and 12"
                  }
                })}
                />
                {errors.hall && <span>{errors.hall.message}</span>}
            </div>

            <div>
                <label>Ticket price (RSD):</label>
                <input type="number" {...register("price",
                { required: "Ticket price is required",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Ticket price must be greater than 0"
                  }
                })}
                />
                {errors.price && <span>{errors.price.message}</span>}
            </div>

            <div>
                <label>Poster URL</label>
                <input
                    {...register("poster")}
                    placeholder="https://example.com/poster.jpg"/>
            </div>

            <button type="submit">Save changes</button>
        </form>
    );
};

export default EditMovieForm;