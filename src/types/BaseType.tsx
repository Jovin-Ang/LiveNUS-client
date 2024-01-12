/**
 * Base type interface for a deserialized jsonapi object
 *
 * @typeParam Type - A string for the field `type`.
 */
interface BaseType<Type> {
    /** Specifies the type */
    readonly type: Type;
    /** The id of the object */
    readonly id: string;
    /** Datetime of object creation in ISO 8601 format */
    readonly created_at: string;
    /** Last updated datetime of object in ISO 8601 format */
    updated_at: string;
}

export default BaseType;
