using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using EssentialSAFe.Models;


namespace EssentialSAFe
{
    [Authorize]
    [RoutePrefix("api/Feature")]
    public class FeatureController : ApiController
    {
        private SAFeModels db = new SAFeModels();
        [Route("Add")]
        public async Task<IHttpActionResult> PostFeature(FeatureModel feature)
        {
            feature.WSJF = (float)(feature.BusinessValue + feature.Urgency + feature.Opportunity) / feature.Size;
            FeatureModel outfeature = db.Features.Add(feature);
            await db.SaveChangesAsync();
            return Ok();
        }

        [Route("List")]
        public List<FeatureModel> GetFeatures()
        {
            List<FeatureModel> features;
            features = db.Features.ToList();
            return features;
        }
        
        public async Task<IHttpActionResult> Delete(int id)
        {
            FeatureModel deleteFeature = await db.Features.FindAsync(id);
            db.Features.Remove(deleteFeature);
            await db.SaveChangesAsync();
            return Ok();
        }

        public async Task<IHttpActionResult> Put(int id, FeatureModel feature)
        {
            
            FeatureModel editFeature = await db.Features.FindAsync(feature.Id);
            editFeature.Name = feature.Name;
            editFeature.NonFunctional = feature.NonFunctional;
            editFeature.Hypothesis = feature.Hypothesis;
            editFeature.BusinessValue = feature.BusinessValue;
            editFeature.Opportunity = feature.Opportunity;
            editFeature.Urgency = feature.Urgency;
            editFeature.Size = feature.Size;
            editFeature.WSJF = (float)(feature.BusinessValue + feature.Urgency + feature.Opportunity) / feature.Size;
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}