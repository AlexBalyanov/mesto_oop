export const API_URL = `${process.env.API_ORIGIN}/v1/wff-cohort-40`

export const settings = {
	headers: {
		authorization: `${process.env.API_TOKEN}`,
		"Content-Type": "application/json"
	},
}
