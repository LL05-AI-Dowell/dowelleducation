import { z } from "zod"

const loginSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(8).max(30),
    workspaceId: z.string().min(3).max(30),
    institutionName: z.string().min(3).max(120),
})

const linkSchema = z.object({
    workspaceId: z.string().min(3).max(30),
    institutionName: z.string().min(3).max(120),
    username: z.string().min(3).max(30)
})

const ScalelinkSchema = z.object({
    workspaceId: z.string().min(3).max(30),
    username: z.string().min(3).max(30)
})

const updateScaleLinkSchema = z.object({
    workspaceId: z.string().min(3).max(30),
    linkId: z.string().min(3).max(30),
})
export {
    loginSchema,
    linkSchema,
    ScalelinkSchema,
    updateScaleLinkSchema
}